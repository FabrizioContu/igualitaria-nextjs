const Map = () => {
  return (
    <>
      {" "}
      {/* Map and Location */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.993966970765!2d2.1543653745037505!3d41.37421579681457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a3d356a3ad25%3A0xb81dc7cdd887ab6c!2sLa%20Igualit%C3%A0ria%20Economat%20Cooperatiu%20del%20Poble-sec!5e0!3m2!1ses!2ses!4v1760522871316!5m2!1ses!2ses"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
};

export default Map;
