
{ Educators } = require "./educators"
moment = require 'moment'
Classes = new Mongo.Collection Meteor.settings.public.classes_collection

ClassesSchema = new SimpleSchema
  name:
    type: String
    autoValue: ()->
      endTime = if this.field("end_time").isSet then this.field("end_time").value else null
      startTime = this.field("start_time").value
      facilityName = this.field("facility_name").value
      location = this.field("location").value
      date = this.field("date").value
      suffix = if endTime then " to #{ endTime }" else ""
      return "#{ facilityName }: #{ location } - #{ date }, #{ startTime }#{ suffix }"
  location:
    type: String
  majority_language:
    type: String
  total_patients:
    type: Number
  total_family_members:
    type: Number
  condition_operation_salesforce_id:
    type: String
    min: 2
  facility_salesforce_id:
    type: String
  attendance_report_salesforce_id:
    type: String
    unique: true
    optional: true
  facility_name:
    type: String
  date_created:
    type: String
    autoValue: ()->
      if not this.value
        return moment().toISOString()
  date:
    type: String
  start_time:
    type: String
  end_time:
    type: String
    optional:true
  errors:
    type: [Object]
    optional: true
    blackbox: true
  #TODO: Make all references to salesforce ids the same term
  "educators.$.contact_salesforce_id":
    type: String
    custom: ->
      educator = Educators.findOne { contact_salesforce_id: this.value }
      if not educator
        return "notAllowed"
  "educators.$.first_name":
    type: String
    optional: true
  "educators.$.last_name":
    type: String
    optional: true
  "educators.$.uniqueId":
    type: String
    optional: true
  "educators.$.class_educator_salesforce_id":
    type: String
    optional: true
  "attendees.$.name":
    type: String
  "attendees.$.patient_id":
    type: String
    optional: true
  "attendees.$.contact_salesforce_id":
    type: String
    optional: true
  "attendees.$.patient_attended":
    type: Boolean
    optional: true
  "attendees.$.language":
    type: String
  "attendees.$.diagnosis":
    type: String
    optional: true
  "attendees.$.num_caregivers_attended":
    type: Number
  "attendees.$.phone_1":
    type: String
    optional:true
  "attendees.$.phone_2":
    type: String
    optional: true

Classes.attachSchema ClassesSchema

module.exports.Classes = Classes
module.exports.ClassesSchema = ClassesSchema
