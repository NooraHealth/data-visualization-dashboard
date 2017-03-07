
###
# Facilities
###

Facilities = new Mongo.Collection Meteor.settings.public.facilities_collection

FacilitiesSchema = new SimpleSchema
  name:
    type:String
    unique: true
  salesforce_id:
    type:String
  delivery_partner:
    type:String

Facilities.attachSchema FacilitiesSchema

module.exports.Facilities = Facilities
