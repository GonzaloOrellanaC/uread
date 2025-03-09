"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    organizationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    description: {
        type: String
    }
    /*resources: {
        User: {
            type: Object,
            required: true
        },
        RolePermission: {
            type: Object,
            required: false
        },
        OrganizationPermission: {
            type: Object,
            required: false
        }
        
        Format
        <Resource Name>: {
            '<actionName>:<possession>: <arrayOfAttributes>
        }
        Example, Name the resource with the mongoose data name
        This will allow to check access control when creating own users, this could mean
        different things depending on how it is checked. For example own users could mean
        a shift manager with permissions over a workshop under an organization, so if they
        have create:own, they can create users assigned to this workshop. It does not force
        you to only self data or any data.
        User: {
            'create:own': ['*']
            'read:any': ['*', '!_id']
        }
    
    }*/
}, {
    timestamps: true,
    id: false
});
roleSchema.index({ name: 1, organizationId: 1 }, { unique: true });
const roleModel = (0, mongoose_1.model)('Role', roleSchema);
exports.default = roleModel;
//# sourceMappingURL=roles.model.js.map