const query = (db, sql, arr)=>{
    return new Promise((resolve, rejecct)=>{
        db.query(sql, arr, (err, res)=>{
            if(err) throw err
            resolve(res)
        })
    })
}

module.exports = query