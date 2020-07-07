import * as defaultConfig from './.tscrc.json';
import clonedeep from 'lodash.clonedeep';

export interface IMaxMessageLineLengthConfig {
  plain?: number;
  portrait?: number;
}

export interface ISetupConfig {
  maxMessageLineLength?: IMaxMessageLineLengthConfig;
}

export interface ITSCDefinition {
  key: string;
  label: string;
  detail: string;
  documentation: string;
  format: string;
  insertText: string;
  nargs: number;
  argtype?: string[];
}

export interface ITSCConfig {
  [key: string]: ITSCDefinition;
}

export interface IGenericConfig {
  [key: string]: string;
}

export interface ICustomConfig {
  [key: string]: IGenericConfig;
}

export interface IConfig {
  setup?: ISetupConfig;
  tsc?: ITSCConfig;
  directions?: IGenericConfig;
  faces?: string[];
  maps?: IGenericConfig;
  weapons?: IGenericConfig;
  items?: IGenericConfig;
  equippables?: IGenericConfig;
  illustrations?: IGenericConfig;
  songs?: IGenericConfig;
  sfx?: IGenericConfig;
  custom?: ICustomConfig;
}

function deepassign(dest: any, src: any) {
  Object.keys(src).forEach(key => {
    if (typeof dest[key] === 'object' && dest[key] !== null) {
      return deepassign(dest[key], src[key]);
    }

    dest[key] = src[key];
  });
}

class Config {
  public config: IConfig;

  constructor() {
    this.config = clonedeep(defaultConfig);
  }

  public getTSCDefinitionsArray(): ITSCDefinition[] {
    const definitions = this.config.tsc;

    if (!definitions) {
      return [];
    }

    return Object.values(definitions);
  }

  public getTSCDefinition(key: string): ITSCDefinition | null {
    return this.config?.tsc?.[key] || null;
  }

  public getDirection(id: string): string {
    return this.config?.directions?.[id] || 'id';
  }

  public getFace(idx: number): string {
    return (this.config?.faces && this.config.faces[idx]) || idx.toString();
  }

  public getMap(id: string): string {
    return this.config?.maps?.[id] || id;
  }

  public getWeapon(id: string): string {
    return this.config?.weapons?.[id] || id;
  }

  public getItem(id: string): string {
    return this.config?.items?.[id] || id;
  }

  public getEquippable(id: string): string {
    return this.config?.equippables?.[id] || id;
  }

  public getIllustration(id: string): string {
    return this.config?.illustrations?.[id] || id;
  }

  public getSong(id: string): string {
    return this.config?.songs?.[id] || id;
  }

  public getSFX(id: string): string {
    return this.config?.sfx?.[id] || id;
  }

  public getCustomValue(key: string, id: string): string {
    return this.config?.custom?.[key]?.[id] || id;
  }

  public getArgumentValue(definition: ITSCDefinition, idx: number, value: string): string {
    const type = (definition?.argtype && definition.argtype[idx]) || 'number';

    if (definition.key === '<GIT') {
      if (value[0] === '0') {
        return this.getWeapon(value);
      }

      value = '0' + value.slice(1);
      return this.getItem(value);
    }

    if (type.startsWith('custom:')) {
      const key = type.replace('custom:', '');

      if (!key.length) {
        return value;
      }

      return this.getCustomValue(key, value);
    }

    switch (type) {
      case 'number':
        return value;
      case 'direction':
        return this.getDirection(value);
      case 'face':
        return this.getFace(parseInt(value));
      case 'map':
        return this.getMap(value);
      case 'weapon':
        return this.getWeapon(value);
      case 'item':
        return this.getItem(value);
      case 'equippable':
        return this.getEquippable(value);
      case 'illustration':
        return this.getIllustration(value);
      case 'song':
        return this.getSong(value);
      case 'sfx':
        return this.getSFX(value);
      default:
        return value;
    }
  }

  public updateConfig(config: IConfig) {
    this.resetConfig();
    deepassign(this.config, config);
  }

  public resetConfig() {
    this.config = clonedeep(defaultConfig);
  }
}

export default Config;