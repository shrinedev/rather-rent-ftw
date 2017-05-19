/**
 * Tabs creates view area that has tabs made out of its children.
 * It only expects all its children to have 'tabLabel', 'tabLinkProps' props.
 * In addition, 'selected' prop specifies which tab is open and 'disabled' renders tab inaccessible.
 *
 * e.g.
 *  <Tabs>
 *    <Child tabLabel="Tab1" tabLinkProps={{ name: 'SomeTab1Page' }}>
 *      Tab1 stuff
 *    </Child>
 *    <Child tabLabel="Tab2" tabLinkProps={{ name: 'SomeTab2Page' }} selected >
 *      Tab2 stuff
 *    </Child>
 *  </Tabs>
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { TabNav } from '../../components';

import css from './Tabs.css';

const Tabs = props => {
  const { children, className, rootClassName, navClassName } = props;
  const rootClasses = rootClassName || css.root;
  const classes = classNames(rootClasses, className);

  const tabNavTabs = React.Children.map(children, child => {
    const { tabLabel, tabLinkProps } = child.props;

    // Child components need to have TabNav props included
    if (!tabLabel || !tabLinkProps) {
      throw new Error(
        `Tabs component: a child component is missing required props.
        tabLabel: (${tabLabel})
        tabLinkProps: (${tabLinkProps})`
      );
    }

    return {
      text: child.props.tabLabel,
      linkProps: child.props.tabLinkProps,
      disabled: child.props.disabled,
      selected: child.props.selected,
    };
  });

  const childArray = React.Children.toArray(children);
  const selectedTabPanel = childArray.find(c => c.props.selected);

  // One of the children needs to be selected
  if (!selectedTabPanel) {
    throw new Error(`Tabs component: one Child should have 'selected' prop.`);
  }

  return (
    <div className={classes}>
      <TabNav className={navClassName} tabs={tabNavTabs} />
      {selectedTabPanel}
    </div>
  );
};

const { node, string } = PropTypes;

Tabs.defaultProps = {
  className: null,
  rootClassName: null,
  navClassName: null,
};

Tabs.propTypes = {
  children: node.isRequired,
  className: string,
  rootClassName: string,
  navClassName: string,
};

export default Tabs;