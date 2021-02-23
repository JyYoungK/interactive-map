import { features } from "../data/countries.json";

// const { countryISOData, countryColorData } = useAuth();

class LoadCountries {
  setState = null;

  countries = ["RUS", "KOR"]

  load = (setState) => {
    this.setState = setState;
    this.#processData();
  };

  #processData = () => {
    for (let i = 0; i < features.length; i++) {
      const country = features[i];
      if(country.properties.color === undefined){
        country.properties.color = "green";
      }
      for (let j=0; j < this.countries.length; j++){
          if (country.properties.ISO_A3 === this.countries[j]){
            country.properties.color = "red";
          }
      }
    }
    this.setState(features);
  };
}

export default LoadCountries;