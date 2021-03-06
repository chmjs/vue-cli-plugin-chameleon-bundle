import * as elements from './components/index.meta';

export default {
  namespace: '<%= bundleNamespace %>-',
  name: '<%= bundleName %>',
  title: '<%= friendlyName %> Bundle',
  elements,
  elementGroups: {
    widgets: {
      key: 'widgets',
      name: 'Widgets',
    },
  },
  optionGroups: {
    general: {
      key: 'general',
      name: 'General',
    },
    style: {
      key: 'style',
      name: 'Style',
    },
  },
};
