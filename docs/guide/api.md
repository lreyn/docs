# REST API
The Syrus 4 API specifies how software components can interact with the device.

To use the documentation you'll need to replace `ipAddress` from the URL with the actual IP address assigned to your Syrus 4 device.

The body of all the requests use JSON format.

---
## Authentication
Request authentication token 

* Properties:
    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | `username` | String | Username (default: `syrus4g`) |
    | `password` | String | Password (default: `123456`) |

### `POST` http://ipAddress/auth/login
* Parameters:

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | `username` | String | Username to authenticate |
    | `password` | String | Password |

* 200/OK Response:

```json
{
    "user": {
        "name": "syrus4g"
    }
}
```

* 401/Unauthorized Response:

```json
{
    "error": {
        "error": {
            "killed": false,
            "code": 1,
            "signal": null,
            "cmd": "sudo apx-user checkuser \"syrus4g\" \"1234567\""
        },
        "errorText": "",
        "output": "{\"error\":\"Invalid Username or Password\"}\n"
    }
}
```

The API uses **Basic Auth** to authenticate requests. 
This means you'll need to add an HTTP header: `Authorization` with the username and password base64 encoded.

Example with the default credentials (syrus4g:123456):

**Authorization         Basic c3lydXM0ZzoxMjM0NTY=**

## GPS/GNSS
Returns json data about GNSS/GPS location information

* Properties:
    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | coords | Object | Location information |
    | latitude | Number | Latitude (WGS-84) |
    | longitude | Number | Longitude (WGS-84) |
    | speed | Number | Speed in km/h |
    | accuracy | Number | Accuracy in meters |
    | altitude | Number | Altitude AMSL in meters |
    | bearing | Number | GNSS heading in degrees, 0: North, 90: East, etc. |
    | altitudeAccuracy | Number | Altitude accuracy in meters |
    | timestamp | Number | Epoch gps timestamp |
    | extras | Object | Additional location information | 
    | hdop | Number | Horizontal dilution of precision  |
    | vdop | Number | Vertical dilution of precision  |  
    | pdop | Number | Position dilution of precision  |
    | fix | Number | GNSS fix status |  
    | satsActive | Number | Amount of active gps satellites used for positioning |  
    | criteria | Number | GPS criteria |  

### `GET` http://ipAddress/gps/position

```json
{
    "coords": {
        "latitude": 25.783386,
        "longitude": -80.293466,
        "speed": 0.015555568000000002,
        "accuracy": 7.199999999999999,
        "altitude": -18.391,
        "bearing": 200.38,
        "altitudeAccuracy": 8.7
    },
    "timestamp": 1605203459,
    "extras": {
        "hdop": 1.44,
        "vdop": 1.74,
        "pdop": 2.26,
        "fix": 3,
        "satsActive": 10,
        "criteria": "signal"
    }
}
```



---
## Network Interfaces
This API provides the methods for connecting to the internet over ethernet, Wi-Fi or 2G/3G/4G modem. By default, the ethernet interface is configured to use DHCP, so, in this case, you can connect to the internet by using ethernet without any configuration. 

* Properties:

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | mac_address | String | interface hardware address |
    | ip_address | String | The IP address assigned |
    | connected | Boolean | True if the interface is connected | 
    | gateway | String | The IP address assigned to the router interface |
    | netmask | String | The subnet mask used for the network |  
    | state | String | State of the network, possible values: `Interface_disabled`, `Scanning`, `Enabled` |
    | ssid | String | Service Set Identifier |
    | signal | String | Signal strength in dbm |
    | key_mgmt | String | Encryption algorithm used by network, possible values: `WPA2-PSK`, `WPA-PSK`, `WPA/WPA2 PSK`, `802.1x EAP`, `None` |
    | mac | String | MAC address for wireless interface |
    | ip | String | ip address assigned |
    | rx_bytes | String | Bytes received |
    | tx_bytes | String | Bytes transmitted |
    | bcast | String | IP address for broadcast |
    | mac | String | MAC address for ethernet interface |
    | mask | String | The subnet mask used for the ethernet interface |
    | MANUFACTURER | String | Modem manufacturer information |
    | REVISION | String | Modem revision |
    | MODEL | String | Modem model |
    | IMEI | String | Device ID |
    | SIM_IMSI | String | SIM's IMSI |
    | SIM_STATE | String | SIM Card State |
    | SIM_ID | String | SIM ID (ICCID) |
    | GSM_REG | String | GSM registration |
    | GPRS_REG | String | GPRS registration |
    | RSSI | String | RSSI |
    | RAT | String | Radio access technology |
    | MCC_MNC | String | Mobile Country and Network Codes |
    | BAND | String | Band utilized |
    | OPERATOR | String | Network operator |
    | MODEM_STATE | String | Modem state |
    | eSIM_IMSI | String | Embedded SIM IMSI |
    | eSIM_ID | String | Embedded SIM ID |
    | eSIM_STATE | String | Embedded SIM State |
    | SIM_TYPE | String | Current SIM selected, possible values: `EMBEDDED`, `EXTERNAL` |
    | APN | String | APN |
    | SIM_PRIORITY | String | SIM Priority (0: default, external sim is prioritized) |
    | SIM_SW_INTERVAL | String | SIM reset interval in hours without communication |
    | KEEP_ALIVE | String | Network keep alive period |

**1. ETHERNET**

### `GET` http://ipAddress/eth/state

* 200/OK Response

```json
{
    "state": "Enabled",
    "mac": "9C:1D:58:3D:5E:9D",
    "ip": "192.168.0.11",
    "bcast": "192.168.0.255",
    "mask": "255.255.255.0",
    "rx_bytes": "2415697",
    "tx_bytes": "12190418"
}
```

---

**2. WIRELESS**

### `GET` http://ipAddress/wifi/state
Returns information about the wireless interface

```json
{
    "state": "Completed",
    "ssid": "^-^",
    "signal": "-18",
    "key_mgmt": "WPA2-PSK",
    "mac": "50:33:8B:DD:1E:43",
    "ip": "192.168.1.207",
    "rx_bytes": "741088",
    "tx_bytes": "10804998"
}
```


### `GET` http://ipAddress/wifi/start
* Parameters: None    

Enables Wi-Fi interface

### `GET` http://ipAddress/wifi/stop
* Parameters: None    

Disables Wi-Fi interface

### `GET` http://ipAddress/wifi/list
* Parameters: None    

List the saved Wi-fi networks 

```json
{
    "ssids": [
        "MyAwesomeInternet",
        "Other wifi"
    ]
}
```


### `GET` http://ipAddress/wifi/scan
* Parameters: None

Starts a Wi-Fi network scan.

```json
{
    "nets": [
        {
            "ssid": "MyAwesomeInternet",
            "signal": -20,
            "auth": "PSK"
        }
    ]
}
```

### `GET` http://ipAddress/wifi/reset
* Parameters: None

Resets the Wi-Fi interface.

### `GET` http://ipAddress/wifi/add/\<ssid\>/\<password\>
* Parameters:
    
    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | ssid | String | Service set identifier or network name |   
    | password <br><mark>optional</mark>| String | Security passphrase to connect to the network | 

### `GET` http://ipAddress/wifi/remove/\<ssid\>
* Parameters:
    
    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | ssid | String | Service set identifier or network name |   

---

**3. HOTSPOT**
This API manages the hotspot feature on the device. You can provide internet to other clients via ethernet or mobile.

* Properties:

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | state | String | Current state of the hotspot |
    | stations | Array[] | List of clients connected  |



### `GET` http://ipAddress/hotspot/list

```json
{
    "stations": []
}
```
    
### `GET` http://ipAddress/hotspot/state

```json
{
    "state": "Enabled",
    "ssid": "Syrus4G-LTE",
    "pass": "***********",
    "routing": "eth0"
}
```

When the hotspot is disabled:

```json
{
    "state": "Disabled"
}
```

### `GET` http://ipAddress/hotspot/edit/\<name\>/\<password\>
To create a hotspot

* Parameters:

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | name | String | Name of the hotspot |
    | password | String | Password to connect to the hotspot |


### `GET` http://ipAddress/hotspot/start
* Parameters: None

Enables hotspot

### `GET` http://ipAddress/hotspot/stop
* Parameters: None

Disables hotspot

---

**4. CELLULAR**

    
### `GET` http://ipAddress/storage/hgetall/modem_information

```json
{
    "MANUFACTURER": "Quectel",
    "REVISION": "EG25GGBR07A06M2G",
    "MODEL": "EG25",
    "IMEI": "867698040020000",
    "SIM_IMSI": "204043257090000",
    "SIM_STATE": "Not in Use",
    "SIM_ID": "8931440400015800000",
    "GSM_REG": "5",
    "GPRS_REG": "5",
    "RSSI": "31",
    "IP": "100.64.238.21",
    "RAT": "FDD LTE",
    "MCC_MNC": "732101",
    "NO_CONN_TIME": "0",
    "BAND": "LTE BAND 7",
    "OPERATOR": "Claro",
    "MODEM_STATE": "ON",
    "eSIM_IMSI": "310260859100000",
    "eSIM_ID": "8901260852391500000F",
    "eSIM_STATE": "READY",
    "SIM_TYPE": "EMBEDDED"
}
```

### `GET` http://ipAddress/storage/hgetall/modem_configuration

```json
{
    "APN": "data.m2mcloudconnect.com",
    "SIM_PRIORITY": "0",
    "SIM_SW_INTERVAL": "72",
    "KEEP_ALIVE": "15"
}
```

### `POST` http://ipAddress/storage/edit
Edit the APN

* Parameters: 

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | apn | String | APN | 
    | user | String | APN Username | 
    | pass | String | APN Password | 
    | pin | String | SIM Pin |  

```json
{
    "apn": "apn.com",
    "user": "username",
    "pass": "password",
    "pin": "1234"
}
```

---
## Inputs/Outputs
Inputs, outputs and analog to digital converters

* Properties:

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | IGN | Boolean | True when ignition is active |
    | IN1 | Boolean | True when input 1 is active |
    | IN2 | Boolean | True when input 2 is active |
    | IN3 | Boolean | True when input 3 is active |
    | IN4 | Boolean | True when input 4 is active |
    | IN5 | Boolean | True when input 5 is active |
    | IN6 | Boolean | True when input 6 is active |
    | IN7 | Boolean | True when input 7 is active |
    | PWR | Boolean | True when external power source is connected |
    | MOT | Boolean | True when motion is detected |
    | TIG | Boolean | True when ignition is active, it depends on ripple in the main power supply |
    | OUT1 | Boolean | True when output 1 is active |
    | OUT2 | Boolean | True when output 2 is active |
    | OUT3 | Boolean | True when output 3 is active |
    | OUT4 | Boolean | True when output 4 is active |
    | SO1 | Boolean | True when short-circuit is detected on output 1 |
    | SO2 | Boolean | True when short-circuit is detected on output 2 |
    | SO3 | Boolean | True when short-circuit is detected on output 3 |
    | SO4 | Boolean | True when short-circuit is detected on output 4 |
    | AN1 | Number | Single analog input channel 1 (0-28000mV) |
    | AN2 | Number | Single analog input channel 2 (0-28000mV) |
    | DAN | Number | Differential analog input channel 3 (0-10000mV) |
    | BAT | Number | Internal battery (milliVolts) |

### `GET` http://ipAddress/IO/all

```json
{"MOT":false,"IGN":true,"IN1":false,"IN2":false,"IN3":false,"IN4":false,"IN5":false,"IN6":false,"IN7":false,"PWR":true,"SO1":false,"SO2":false,"SO3":false,"SO4":false,"TIG":false,"OUT1":false,"OUT2":false,"OUT3":false,"OUT4":false,"BAT":4.051,"AN1":0,"AN2":0,"DAN":0}
```

### `POST` http://ipAddress/IO/\<OUT#\>/\<STATE\>
* Parameters:

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | OUT# | Boolean | Output to manipulate, possible values: `1`, `2`, `3`, `4` |
    | STATE | Boolean | `true` to activate the output, `false` to deactivate  |

Example of Output 4 activation

**`POST` http://ipAddress/IO/OUT4/true**

---
## Accelerometer
The accelerometer API allows you to capture the device motion acceleration in 3D space using an X, Y, Z coordinate system.
In general when configuring the accelerometer the higher the threshold you configure (more milli-g) the more force would have to be exerted in order to detect the accelerometer event.

* Properties:

| Field | Type | Description | Range |
| ----- | ---- | ----------- | ----- |
| MOTION | String | "0" if no motion detected, "1" if motion detected | 0·1
| FW_VERSION | String | Current firmware version of the accelerometer |
| MOTION_THRESHOLD | String | Threshold in milli-g (`default: 30`), higher values are less sensible to movement | 10 · 500 |
| MOTION_DURATION | String | Motion duration in seconds (`default: 2`) | 1 · 8 |
| MOTION_BUFF_TIME_SIZE | String | Motion time window in seconds (`default: 4`) | 1 · 8 |
| CFG_FORWARD_COLLISION | String | Forward collision sensitivity (`default: -2000`)  | -1000 · -15000
| CFG_BACKWARD_COLLISION | String | Backward collision sensitivity (`default: 2000`) | 1000 · 15000 
| CFG_LAT_COLLISION_FROM_RIGHT | String | Lateral collision from the right sensitivity (`default: -2000`) | -1000 · -15000
| CFG_LAT_COLLISION_FROM_LEFT | String | Lateral collision from the left sensitivity (`default: 2000`) | 1000 · 15000
| CFG_HARSH_FWD_ACCELERATION | String | Forward acceleration sensitivity (`default: 260`) | 200 · 600
| CFG_HARD_BRAKING | String | Hard braking sensitivity (`default: -260`) |  -200 · -600
| CFG_CORNERING_RIGHT | String | Cornering right sensitivity (`default: -350`) |  -200 · -600
| CFG_CORNERING_LEFT | String | Cornering left sensitivity (`default: 350`) |  200 · 600

### `GET` http://ipAddress/storage/hgetall/accel_current_state
Current state of the accelerometer

```json
{
    "MOTION": "0",
    "FW_VERSION": "1.0.1"
}
```

### `GET` http://ipAddress/storage/hgetall/accel_configuration
Returns the accelerometer configuration

```json
{
    "MOTION_THRESHOLD": "30",
    "MOTION_DURATION": "2",
    "MOTION_BUFF_TIME_SIZE": "4",
    "CFG_FORWARD_COLLISION": "-2000",
    "CFG_BACKWARD_COLLISION": "2000",
    "CFG_LAT_COLLISION_FROM_RIGHT": "-2000",
    "CFG_LAT_COLLISION_FROM_LEFT": "2000",
    "CFG_HARSH_FWD_ACCELERATION": "260",
    "CFG_HARD_BRAKING": "-260",
    "CFG_CORNERING_RIGHT": "-350",
    "CFG_CORNERING_LEFT": "350"
}
```

### `POST` http://ipAddress/Accel/AutoAlignment
Execute the auto alignment algorithm.  This is required in order for the accelerometer events to work properly. Send this after the device is properly installed in a vehicle.

* Parameters

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | state | Boolean | True to execute the auto alignment algorithm |

```json
{
    "state": true
}
```

## System
This API provides system information

* Properties: 

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | ram | Object | RAM information |
    | total | Number | Total RAM |
    | free | Number | Total RAM free |
    | available | Number | Total RAM available |
    | cpu | Object | CPU information |
    | currF | Number | Current frequency |
    | usage | Number | CPU usage percentage |
    | governor | String | CPU governor policy |
    | stats | Object | CPU frequency breakdown |
    | rootfs | Object | Root file system space in bytes |
    | datafs | Object | Data file system space in bytes |
    | uptime | Number | Uptime since last reset |
    | loadAvg | Number[] | Load average |
    | apexVersion | String | Apex OS version |
    | releaseDate | String | OS release date information YYYYMMDDHHmmss |
    | sessionCount | Number | Amount of sessions opened with the device |
    | kernelVersion | String | Kernel version |
    | netLink | Object | network information |
    | netLink.name | string | network link information |
    | netLink.ip | string | network link ip address |
    | hostname | String | syrus-IMEI_NUMBER |

### `GET` http://ipAddress/system-info

```json
{
    "ram": {
        "total": 506084,
        "used": 173340,
        "free": 139888,
        "available": 343920
    },
    "cpu": {
        "currF": 1000,
        "usage": 24.5162,
        "governor": "ondemand",
        "stats": {
            "300": 1154.77,
            "600": 94203.26,
            "720": 1197.33,
            "800": 877.77,
            "1000": 4425.88
        }
    },
    "rootfs": {
        "total": 444018,
        "free": 146610
    },
    "datafs": {
        "total": 2255680,
        "free": 2035912
    },
    "uptime": 101860,
    "loadAvg": [
        1.58,
        1.65,
        1.64
    ],
    "apexVersion": "apex-20.45.2",
    "releaseDate": "20201109203527",
    "sessionCount": 2,
    "kernelVersion": "5.4.20-g738552d0b0",
    "netLink": {
        "name": "wlan0",
        "ip": "192.168.1.111"
    },
    "hostname": "syrus-867698040023056"
}
```

## Updates
This API checks for device updates

### `GET` http://ipAddress/updates/os/check

* Possible responses
```json
{"mess":"Up To Date"}

{"mess":"Update available"}

{"mess":"Update in progress. This will take a few minutes"}

{"mess":"Successfully updated. Device will be restarted in any moment"}	

{"error":"Error getting file. Try again"}
```
## App Manager
API to manage applications on the device

* Properties: 

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | name | String | Name of the application |
    | version | String | Application version |
    | status | String | Status of the application, possible values: `active`, `inactive` |
    | manifest | Object | Information about the content of the app |


### `GET` http://ipAddress/apps-manager

```json
[
    {
        "name": "syrusjs",
        "version": "1.20.0",
        "status": "active",
        "manifest": {
            "name": "syrusjs",
            "version": "1.20.0",
            "description": "Syrus.js  Application that works with syruslang language",
            "main": "main.js",
            "scripts": {
                "test": "test",
                "optimize": "rm -rf node_modules && npm install --production && npm prune && node-prune",
                "build": "npm run optimize && zip -r ../syrusjs.zip . -x ./configuration.syrus.conf ./_structure.json ./.vscode ./deploy.sh ./.gitignore ./.git/\\* ./.vscode/\\*"
            },
            "keywords": [
                "pegasus"
            ],
            "author": "dctdevelopers@digitalcomtech.com",
            "license": "ISC",
            "dependencies": {
                "@turf/bbox": "^6.0.1",
                "@turf/buffer": "^5.1.5",
                "dayjs": "^1.8.25",
                "dot-object": "^2.1.3",
                "dotenv": "^8.2.0",
                "log-timestamp": "^0.3.0",
                "on-change": "^2.0.1",
                "syrus4-nodejs": "http://github.com/dctdevelop/syrus4-nodejs/tarball/master"
            }
        },
        "hasReadme": true,
        "hasChangelog": true,
        "stable": "1.20.0-beta"
    }
]
```

## ECU
API to manage the device's ECU interface for communication with a vehicle's CAN bus.

* Properties:

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | name | String | Name of the application |
    | version | String | Application version |
    | status | String | Status of the application, possible values: `active`, `inactive` |
    | manifest | Object | Information about the content of the app |


### `POST` http://ipAddress/ecu/eculist
Add a new parameter to the ECU configuration list. For more information on how to configure the ECU parameters, visit: [parameter-file](/ecu/#parameter-file)

* Properties

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | PARAM_NAME | String | Full parameter name |
    | PGN | String | PGN to configure in HEX forma (trim trailing 0s) |
    | TRANSMISSION_RATE | String | Transmission repetition rate of the PGN  |
    | PRIORITY | String | Priority defined by the standard |
    | DLC | String | Value of the data length |
    | LENGTH | String | Length of the parameter |
    | START_POSITION | String | Start position of the parameter |
    | MULTIPLIER | String | First component of the resolution |
    | GROUP | String | Group of parameters desired, possible values: `SIGNAL`, `PERCENT`, `EXTENDED_SIGNAL`, `NUMBER_VALUE` |
    | OFFSET | Number | Second component of the resolution |

```json
{
    "PARAM_NAME": "new",
    "PGN": "FEF1",
    "PRIORITY": "3",
    "DLC": "1",
    "LENGTH": "4",
    "START_POSITION": "1",
    "MULTIPLIER": "1",
    "TRANSMISSION_RATE": "ON_REQUEST",
    "GROUP": "PERCENT",
    "OFFSET": 0
}
```

### `POST` http://ipAddress/ecu/ecuconfig
Configure the ECU of the device. For more information please visit: [config-file](ecu/#configuration-file)

* Properties

    | Field | Type | Description |
    | ----- | ---- | ----------- |
    | PRIMARY_CAN | String | Primary CAN configuration (CAN1_H / CAN1_L cables) |
    | SECONDARY_CAN | String | Secondary CAN configuration (CAN2_H / CAN2_L cables) |
    | J1708 | String | True if J1708 is configured |
    | LISTEN_ONLY_MODE | String | Listen only mode programmed |

```json
{
    "PRIMARY_CAN": "J1939_250KHZ",
    "SECONDARY_CAN": "J1939_500KHZ",
    "J1708": "TRUE",
    "LISTEN_ONLY_MODE": "NONE"
}
```