// ti.z-stack-examples.js
const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;

const definition = [
  {
    zigbeeModel: ['ti.z-stack-examples.light'],
    model: 'ti.z-stack-examples.light',
    vendor: 'TexasInstruments',
    description: '',
    fromZigbee: [fz.on_off, fz.brightness, fz.level_config, fz.power_on_behavior, fz.ignore_basic_report],
    toZigbee: [tz.light_onoff_brightness, tz.ignore_transition, tz.ignore_rate, tz.light_brightness_move,
            tz.light_brightness_step, tz.level_config, tz.power_on_behavior],
    exposes: [e.light_brightness()],
    configure: async (device, coordinatorEndpoint, logger) => {
      const endpoint = device.getEndpoint(8);
      await reporting.bind(endpoint, coordinatorEndpoint, ['genLevelCtrl']);
      await reporting.brightness(endpoint);
    },
  },
  {
    zigbeeModel: ['ti.z-stack-examples.sw'],
    model: 'ti.z-stack-examples.sw',
    vendor: 'TexasInstruments',
    description: '',
    extend: extend.switch(),
  },
  {
    zigbeeModel: ['ti.z-stack-examples.temperaturesensor'],
    model: 'ti.z-stack-examples.temperaturesensor',
    vendor: 'TexasInstruments',
    description: '',
    fromZigbee: [fz.temperature],
    toZigbee: [],
    configure: async (device, coordinatorEndpoint, logger) => {
      const endpoint = device.getEndpoint(8);
      const binds = ['genBasic', 'genIdentify', 'msTemperatureMeasurement'];
      await reporting.bind(endpoint, coordinatorEndpoint, binds);
      await reporting.temperature(endpoint);
    },
    exposes: [e.temperature()],
  },
  {
    zigbeeModel: ['ti.z-stack-examples.thermostat'],
    model: 'ti.z-stack-examples.thermostat',
    vendor: 'TexasInstruments',
    description: '',
    fromZigbee: [fz.battery, fz.thermostat],
    toZigbee: [tz.thermostat_local_temperature,tz.thermostat_occupied_heating_setpoint, tz.thermostat_occupied_cooling_setpoint,
               tz.thermostat_unoccupied_heating_setpoint,tz.thermostat_system_mode],
    configure: async (device, coordinatorEndpoint, logger) => {
      const endpoint = device.getEndpoint(8);
      const binds = ['genBasic', 'genIdentify', 'hvacThermostat'];
      await reporting.bind(endpoint, coordinatorEndpoint, binds);
      await reporting.thermostatTemperature(endpoint);
    },
    exposes: [exposes.climate()
            .withSetpoint('occupied_heating_setpoint', 10, 30, 0.5)
            .withSetpoint('occupied_cooling_setpoint', 10, 30, 0.5)
            .withLocalTemperature()
            .withSystemMode(['off', 'auto', 'heat']
    )],
  },
];

module.exports = definition;
