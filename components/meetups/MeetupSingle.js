import styles from './MeetupSingle.module.css';

const MeetupSingle = (props) => {
  return (
    <section className={styles.detail}>
      <img src={props.image} alt="" />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupSingle;
