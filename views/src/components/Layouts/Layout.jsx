import classes from './Layout.module.css';
import Navigation from './Navigation';

function Layout(props) {
  const { children } = props;
  return (
    <div>
      <Navigation />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

export default Layout;