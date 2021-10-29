const axios = require('axios');

exports.Zignaly = class Zignaly {
  constructor (options, app) {
    this.options = options || {};
    this.app = app || {};
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    await this.validateFreqtradeSignal(data);

    this.sendToZignaly({
      'key': data.zignaly_key,
      'type': data.type === 'buy' ? 'entry' : 'exit',
      'signalId': data.trade_id || data.pair.replace('/', ''),
      'orderType': data.order_type || 'market',
      'exchange': data.exchange || 'zignaly',
      'pair': data.pair.replace('/', ''),
      'positionSizePercentage': data.position_size_percentage || '5'
    });

    return data;
  }

  /**
   * Validate the Freqtrade signal to make sure we have all the data
   * @param {Object} data
   */
  async validateFreqtradeSignal(data) {
    if (!data.zignaly_key || !data.type || !data.pair) {
      throw new Error('Validation failed - missing one of {key|type|exchange|pair}. Data: ' + JSON.stringify(data));
    }
  }

  /**
   * Sends the signal to Zignaly webhook
   * @param {Object} data
   * @returns
   */
  async sendToZignaly(data) {
    try {
      const res = await axios({
        url: this.app.get('zignalyApiUrl'),
        data,
        method: 'post',
        responseType: 'json',
      });
      console.log(res);
    } catch (e) {
      console.log(`Error sending signal to Zignaly: ${e.message}`);
      console.log('Data:', data);
      return false;
    }
  }
};
