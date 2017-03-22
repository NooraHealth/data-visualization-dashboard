import { createContainer } from 'meteor/react-meteor-data';
import { Educators } from '../../api/collections/educators.coffee';
import { ConditionOperations } from '../../api/collections/condition_operations.coffee';
import { Classes } from '../../api/collections/classes.coffee';
import { AppConfig } from '../../api/AppConfig.coffee';
import { HomePage } from '../pages/Home.jsx';

export default HomePageContainer = createContainer(( params ) => {

  const facilityName = AppConfig.getFacilityName();
  const handle = Meteor.subscribe( "classes.byFacility" , facilityName );

  _getClasses = function( facilityName ){
     return Classes.find({ facility_name: facilityName }).fetch();
  }
  
  return {
    loading: ! handle.ready(),
    facilityName: facilityName,
    classes: _getClasses( facilityName )
  };

}, HomePage);

export { HomePageContainer };
