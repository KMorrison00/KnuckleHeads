import Particles from "react-particles";
import { loadStarsPreset } from "tsparticles-preset-stars";

export function Stars(props) {
  // this customizes the component tsParticles installation
  const customInit = async (engine) => {
    // this adds the preset to tsParticles, you can safely use the
    await loadStarsPreset(engine);
  };

  const options = {
    preset: "stars",
  };

  return <Particles options={options} init={customInit} />;
}

