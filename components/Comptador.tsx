const Comptador = () => {
  return (
    <section className="grid md:grid-flow-col font-poppins bg-primary">
      <div className=" text-white text-2xl md:text-3xl font-semibold pt-1 ">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center py-5">
          <div className="flex gap-2">
            {" "}
            <p className=" ">JA SOM</p>
            <p>
              <span className="py-2 px-3 bg-pink-600 rounded-2xl">199</span>
            </p>
            <p className=" ">SÒCIES</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comptador;
