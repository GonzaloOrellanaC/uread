import Imap from 'node-imap'
import {simpleParser} from 'mailparser'
import { logger } from '@/utils/logger';
import userModel from '@/models/users.model';
import alumnoProvisorioModel from '@/models/alumnos-provisorios.model';
import { sendPagoValidadoEmail } from './email.service';
import { generateHTML } from '@/utils/html';
import path from 'path';
import { __ } from 'i18n';

interface EmailConfig {
    user: string;
    password: string;
    host: string;
    port: number;
    tls: boolean;
}


function extract(str: string) {
    const email = 
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    return str.match(email);
}

const obtenerPago = (text: string) => {
    if (text.includes('3.000')) {
        return '3.000'
    } else if (text.includes('6.000')) {
        return '6.000'
    } else if (text.includes('9.000')) {
        return '9.000'
    } else if (text.includes('12.000')) {
        return '12.000'
    } else {
        return 'no value'
    }
}

export async function checkEmails(config: EmailConfig): Promise<void> {
    const imap = new Imap({
      user: config.user,
      password: config.password,
      host: config.host,
      port: config.port,
      tls: config.tls,
    });
  
    function openInbox(cb: (err: any, mailbox: Imap.Box) => void) {
      imap.openBox('INBOX', false, cb);
    }
  
    imap.once('ready', function () {
      openInbox(function (err, box) {
        if (err) throw err;
        try {
            imap.search(['UNSEEN', ['SINCE', new Date(Date.now() - 86400000)]], function (err, results) { // Busca correos no leídos del último día
                if (err) throw err;
                if (results.length === 0) {
                  imap.end();
                  return;
                }

                const f = imap.fetch(results, { bodies: '' });
                f.on('message', function (msg, seqno) {
                  msg.on('body', function (stream, info) {
                    simpleParser(stream, async (err, parsed) => {
                      if (err) {
                        logger.error(err)
                      } else {
                        logger.info(`De: %s ${parsed.from?.text}`)
                        logger.info(`De: %s ${parsed.subject}`)
                      }
                      extract(parsed.text).forEach(email => {
                          if (email !== 'webpaycl@transbank.cl') {
                              if (email !== 'recepcion.pagos@uread.cl') {
                                logger.info(email)
                                validarPagos(email, obtenerPago(parsed.text))
                              }
                          }
                      })
                      logger.info(obtenerPago(parsed.text))
                    });
                  });
                  
                  msg.once('attributes', function (attrs) {
                    const uid = attrs.uid;
                    imap.addFlags(`${uid}:${uid}`, ['Seen'], function (err) {
                        if (err) {
                            logger.error(err);
                        }
                    });
                  });
                  msg.once('end', function () {
                    console.log('Finalizado el mensaje #%d', seqno);
                  });
                });
                f.once('error', function (err) {
                  console.log('Error de búsqueda:', err);
                });
                f.once('end', function () {
                  console.log('Terminado de obtener todos los mensajes');
                  imap.end();
                });
              });
        } catch ({name, message}) {
            logger.error(`${name} ${message}`)
        }
      });
    });
  
    imap.once('error', function (err) {
        logger.error(err);
    });
  
    imap.once('end', function () {
      console.log('Conexión IMAP cerrada');
    });
  
    imap.connect();
}


const validarPagos = async (email: string, pago: string) => {
  console.log(Number(pago.replace('.', '')))
  const precioPagado = Number(pago.replace('.', ''))
  const apoderado = await userModel.findOne({email, roles: {$in : ['67d08179b9faf99da335828d']}})
  const alumnos: any[] = await alumnoProvisorioModel.find({apoderado: apoderado._id, medioPago: 'transbank'})
  const listaPlanA: any[] = []
  const listaPlanB: any[] = []
  const listaPlanC: any[] = []
  alumnos.forEach((alumno) => {
    if (alumno.plan === 'A') {
      listaPlanA.push(alumno)
    }
    if (alumno.plan === 'B') {
      listaPlanB.push(alumno)
    }
    if (alumno.plan === 'C') {
      listaPlanC.push(alumno)
    }
  })
  const precioPlanA: number = listaPlanA.length * 3000
  const precioPlanB: number = listaPlanB.length * 6000
  const precioPlanC: number = listaPlanC.length * 15000

  if (precioPagado === precioPlanA) {
    listaPlanA.forEach(async (a) => {
      await alumnoProvisorioModel.findByIdAndUpdate(a._id, {permiteValidar: true})
    })
  }

  if (precioPagado === precioPlanB) {
    listaPlanB.forEach(async (a) => {
      await alumnoProvisorioModel.findByIdAndUpdate(a._id, {permiteValidar: true})
    })
  }

  if (precioPagado === precioPlanC) {
    listaPlanC.forEach(async (a) => {
      await alumnoProvisorioModel.findByIdAndUpdate(a._id, {permiteValidar: true})
    })
  }
  
  const args = {
      fullName: `${apoderado.name} ${apoderado.lastName}`,
      apoderado: `${apoderado.name}`
  }
  await sendPagoValidadoEmail(
      apoderado.email,
      'Validación de pago',
      generateHTML(path.join(__dirname, `/../../emailTemplates/validacion-pago/email.html`), args),
      null
      /* { attachments: [{ filename: 'logo.png', path: frontendAsset('assets/images/logo.png'), cid: 'logo' }] } */
  ).catch(err => logger.error(__({ phrase: err.message, locale: 'es' })))
}
  