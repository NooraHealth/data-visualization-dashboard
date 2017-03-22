

{ Facilities } = require "../../api/collections/facilities.coffee"
{ Classes } = require "../../api/collections/classes.coffee"
{ Educators } = require "../../api/collections/educators.coffee"

Meteor.publish "facilities.all", ()->
  return Facilities.find {}

Meteor.publish "classes.byFacility", ( name )->
  return Classes.find { facility_name: name }
