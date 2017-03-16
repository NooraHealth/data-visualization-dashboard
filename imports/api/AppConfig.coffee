
{ Facilities } = require './collections/facilities.coffee'

class AppConfig
  @get: ->
    @privateApp ?= new PrivateClass()
    return @privateApp

  class PrivateClass
    constructor: ->

    setFacilityName: ( name )->
      Session.set "current_facility_name", name

    getFacilityName: ->
      name = Session.get "current_facility_name"
      if name == undefined
        @setFacilityName ""
      return Session.get "current_facility_name"

    getFacilityId: ->
      name = this.getFacilityName()
      facility = Facilities.findOne({ name: name });
      return facility?.salesforce_id

module.exports.AppConfig = AppConfig.get()
