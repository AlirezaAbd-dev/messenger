import NodeCache from 'node-cache';

let cache;

try {
   cache = Object.freeze(new NodeCache({ stdTTL: 600 }));
} catch (err) {
   console.log(err);
}

export default cache as NodeCache;
