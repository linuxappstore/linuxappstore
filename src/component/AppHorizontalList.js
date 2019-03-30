
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinuxApp from './LinuxApp.js';

const styles = theme => ({
    listWrapper: {
      overflow: 'auto',
      whiteSpace: 'nowrap',
      backgroundColor: theme.palette.background.paper,
    }
  });

  class AppHorizontalList extends React.Component {
      render() {
        const { classes, items, width } = this.props;
        return (
            <div style={{width: width}}>
            <div className={classes.listWrapper}>
                {items.map(item => (
                    <LinuxApp data={item} />
                ))}
            </div>
            </div>
          );
      }
  }

  AppHorizontalList.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(AppHorizontalList);