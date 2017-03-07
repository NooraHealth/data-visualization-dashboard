import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

// Import needed templates
import { MainLayout } from '../../ui/layouts/layout.jsx';
import { HomePage } from '../../ui/pages/Home.jsx';
import { NotFound } from '../../ui/pages/NotFound.jsx';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'home',
  action() {
    mount( MainLayout, {
      content: <HomePage key='homepage'/>
    });
  },
});

FlowRouter.notFound = {
  action() {
    mount( MainLayout, {
      content: <NotFound key='not-found'/>
    });
  },
};
