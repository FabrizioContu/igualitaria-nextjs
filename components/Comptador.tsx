const Comptador = () => {
  return (
    <section className="grid md:grid-flow-col font-poppins bg-primary">
      <div className=" text-white text-2xl md:text-3xl font-semibold pt-1 ">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center py-5">
          <p aria-label="Ja som 149 sòcies" className="flex gap-2">
            <span aria-hidden="true">JA SOM</span>
            <span aria-hidden="true">
              <span className="py-2 px-3 bg-pink-600 rounded-2xl">149</span>
            </span>
            <span aria-hidden="true">SÒCIES</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Comptador;
