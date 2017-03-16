
import { createContainer } from 'meteor/react-meteor-data';
import { Dropdown } from '../components/form/Dropdown.jsx';
import { Facilities } from '../../api/collections/facilities.coffee';
import { AppConfig } from '../../api/AppConfig.coffee';

export default SelectFacilityContainer = createContainer(() => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handle = Meteor.subscribe("facilities.all");

  this._onChange = function(value) {
    AppConfig.setFacilityName( value );
  };

  this._getFacilityOptions = function( facilities ) {
    const names= facilities.map( function( facility ){
      return facility.name;
    });
    return names.map( function(name){
        return { value: name, name: name };
    });
  };

  return {
    loading: ! handle.ready(),
    options: _getFacilityOptions( Facilities.find({}).fetch() ),
    label: "Facility",
    required: true,
    selected: [{ value: AppConfig.getFacilityName(), name: AppConfig.getFacilityName()}],
    placeholder: " Search Facilities",
    onChange: _onChange
  };
}, Dropdown);

export { SelectFacilityContainer };
