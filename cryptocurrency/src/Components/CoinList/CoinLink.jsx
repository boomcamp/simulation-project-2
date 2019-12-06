import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

function CoinLink(props) {

  const thisStyles = makeStyles(theme => ({
    linkStyle: {
      textDecoration: 'none',
    },
    buttonStyle: {
      textTransform: 'capitalize',
      '&:hover': {
        background: '#00897b',
        color: '#ffffff',
        fontWeight: '400'
      }
    }
  }));

  const style = thisStyles();
  return (
    <Link className={style.linkStyle} to={"/" + props.id}>
      <Button className={style.buttonStyle} title={"Click me for "+ props.name + " details"}>{props.name}</Button>
    </Link>
  )
}

export default CoinLink;
