import Image from "next/image";

export const HeroSection = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <section className="relative overflow-hidden bg-blue-50">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 lg:w-full lg:max-w-2xl">
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              <span
                className="block"
                dangerouslySetInnerHTML={{ __html: title }}
              ></span>
            </h1>
            <div
              className="mt-6 max-w-lg text-xl text-gray-600"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </div>
      </div>
      <div className=" lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          src="/heroImage3.png"
          alt="La Igualitària"
          width={800}
          height={600}
          className=" lg:w-auto h-full object-cover"
          priority
        />
      </div>
    </section>
  );
};
