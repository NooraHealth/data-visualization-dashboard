import { createContainer } from 'meteor/react-meteor-data';
import { Educators } from '../../api/collections/educators.coffee';
import { ConditionOperations } from '../../api/collections/condition_operations.coffee';
import { Classes } from '../../api/collections/classes.coffee';
import { HomePage } from '../pages/Home.jsx';

export default HomePageContainer = createContainer(( params ) => {

  this._getClasses = function( facilityName ){
     return Classes.find({ facility_name: facilityName });
  }

  return {
    classes: _getClasses( AppConfig.getFacilityName() )
  };

}, HomePage);

export { HomePageContainer };
