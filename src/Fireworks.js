import Particles from "react-particles";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";

export function Fireworks(props) {
  // this customizes the component tsParticles installation
  const customInit = async (engine) => {
    // this adds the preset to tsParticles, you can safely use the
    await loadFireworksPreset(engine);
  };

  const options = {
    background : {color: {value: '#053C61'}},
    preset: "fireworks",
  };

  return <Particles options={options} init={customInit} />;
}

