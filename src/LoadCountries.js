import { features } from "./data/countries.json";

class LoadCountryTask {
  setState = null;

  countries = ["KOR", "AFG", "DZA"]

  load = (setState) => {
    this.setState = setState;
    this.#processCovidData();
  };

  #processCovidData = () => {
    for (let i = 0; i < features.length; i++) {
      const country = features[i];
      for (let j=0; j < this.countries.length; j++){
          if (country.properties.ISO_A3 === this.countries[j]){
            country.properties.color = "red";
          }
          else if(country.properties.color === undefined){
            country.properties.color = "green";
          }
      }
    }

    this.setState(features);
  };
}

export default LoadCountryTask;