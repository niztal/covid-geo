const admin = require('firebase-admin');

const getVariants = async () => {
    console.log('getting variants...');
    let variants = [];
    const db = admin.firestore();
    const variantsFromDB = await db.collection('variants').get();
    variantsFromDB.forEach((doc) => {
        variants.push(doc.data());
    });

    return variants;
}

const addVariant = async (name, date, geo) => {
    const db = admin.firestore();
    const geoDb = new admin.firestore.GeoPoint(geo.latitude, geo.longitude);
    await db.collection('variants').add({name, date, geo: geoDb});
}

// module.exports = [getVariants, addVariant];
exports.getVariants = getVariants;
exports.addVariant = addVariant;