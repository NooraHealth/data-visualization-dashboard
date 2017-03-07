###
# Condition Operations
###

{ SimpleSchema } = require "meteor/aldeed:simple-schema"

ConditionOperations = new Mongo.Collection Meteor.settings.public.condition_operations_collection

ConditionOperationsSchema = new SimpleSchema
  _id:
    type: String
  name:
    type:String
  salesforce_id:
    type:String
  facility_name:
    type:String
  facility_salesforce_id:
    type:String

ConditionOperations.attachSchema ConditionOperationsSchema

module.exports.ConditionOperations = ConditionOperations
module.exports.ConditionOperationsSchema = ConditionOperationsSchema
