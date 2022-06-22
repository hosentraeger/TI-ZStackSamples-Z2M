# TI-ZStackSamples-Z2M
integrating Texas Instruments Zigbee Examples into Zigbee2MQTT

Texas Instrument manufactures various RF-SOCs which are able to do Zigbee Communication. TI offers free development tools to create firmware for Zigbee devices which also contain some examples.
This project aims at integrating some of these examples into Zigbee2MQTT:
- light
- switch
- temperature sensor
- thermostat

As these examples, flashed to a TI Launchpad (or Zigbee module), are fully functional Zigbee devices, it takes only little to make them work with Zigbee2MQTT:

1. They need an additional attribute "model identifier"
-------------------------------------------------------
Open Application/zcl_xxx_data.c
add

const uint8_t zclSampleLight_ModelIdentifier[] =  { 25, 't','i','.','z','-','s','t','a','c','k','-','e','x','a','m','p','l','e','s','.','l','i','g','h','t'};
to global variables

add
  {
   ZCL_CLUSTER_ID_GENERAL_BASIC,
       {
           ATTRID_BASIC_MODEL_IDENTIFIER,
           ZCL_DATATYPE_CHAR_STR,
           ACCESS_CONTROL_READ,
           (void *)&zclSampleLight_ModelIdentifier
       }
  },

to CONST zclAttrRec_t zclSampleLight_Attrs[], right after the corresponding section for zclSampleLight_ManufacturerName

2. Zigbee2MQTT needs a converter that recognizes the zigbee model
