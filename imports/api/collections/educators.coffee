
###
# Educator
###

Educators = new Mongo.Collection Meteor.settings.public.educators_collection

EducatorsSchema = new SimpleSchema
  _id:
    type: String
    optional: true
  last_name:
    type: String
    defaultValue: ""
    optional: true
  first_name:
    type: String
    defaultValue: ""
    optional:true
  department:
    type: String
    defaultValue: ""
    optional: true
  "condition_operations.$.is_active":
    type: Boolean
  "condition_operations.$.role_salesforce_id":
    type: String
    defaultValue:""
    optional: true
  "condition_operations.$.name":
    type: String
  "condition_operations.$.id":
    type: String
  "condition_operations.$.operation_salesforce_id":
    type: String
  "condition_operations.$.date_started":
    type: String
    optional: true
  facility_salesforce_id:
    type: String
    defaultValue: ""
    optional: true
  facility_role_salesforce_id:
    type: String
    defaultValue: ""
    optional: true
  contact_salesforce_id:
    type: String
    defaultValue: ""
    optional: true
  facility_name:
    type: String
    defaultValue: ""
    optional: true
  phone:
    type: Number
    defaultValue: ""
    optional: true
  needs_update:
    type: Boolean
    optional: true
    defaultValue: false
  uniqueId:
    type: String
    label: "Unique Id"
    optional: true
  export_error:
    type: Boolean
    optional: true
    defaultValue: false
  update_error:
    type: Boolean
    optional: true
    defaultValue: false

Educators.attachSchema EducatorsSchema

module.exports.Educators = Educators
module.exports.EducatorsSchema = EducatorsSchema
