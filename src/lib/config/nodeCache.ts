import NodeCache from 'node-cache';

const cache = Object.freeze(new NodeCache({ stdTTL: 600, checkperiod: 600 }));

export default cache;
