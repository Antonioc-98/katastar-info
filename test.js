const fs = require('fs');

fs.readFile('test/pula.json', 'utf-8', function (err, data) {
    if (err) throw err;

    let obj = JSON.parse(data);




    const delay = async (ms = 20) =>
        new Promise(resolve => setTimeout(resolve, ms))
    async function makeALoopWait() {

        let a = obj.length
        for (let ia = 0; ia < a; ia++) {
            let b = obj[ia].length
            //console.log(`Prvi for ${ia}`)
            for (let ib = 0; ib < b; ib++) {
                let c = obj[ia][ib].ownershipSheetB.lrUnitShares.length
                //console.log(`Drugi for ${ib}`)
                for (let ic = 0; ic < c; ic++) {
                    if (obj[ia][ib].ownershipSheetB.lrUnitShares[ic].lrOwners) {
                        let d = obj[ia][ib].ownershipSheetB.lrUnitShares[ic].lrOwners.length
                        //console.log(`Treći etaže for ${ic}`)
                        for (let id = 0; id < d; id++) {
                            //console.log(`Četvrti owners for ${id}`)
                            console.log(obj[ia][ib].ownershipSheetB.lrUnitShares[ic].lrOwners[id].name)
                            if (obj[ia][ib].ownershipSheetB.lrUnitShares[ic].lrOwners[id].name) {
                                console.log(true)
                                fs.writeFile('test/pulanovo.json',
                                    `,[{"ime": "${obj[ia][ib].ownershipSheetB.lrUnitShares[ic].lrOwners[id].name}", "adresa": "${obj[ia][ib].ownershipSheetB.lrUnitShares[ic].lrOwners[id].adress}", "OIB": "${obj[ia][ib].ownershipSheetB.lrUnitShares[ic].lrOwners[id].taxNumber}", "Zemljišnoknjižni ured": "${obj[ia][ib].institutionName}", "Broj ZK uloška/KPU poduloška": "${obj[ia][ib].lrUnitNumber}"}],`, { encoding: 'utf8', flag: 'a' }, err => {

                                        if (err) {
                                            console.error(err);
                                        } else {
                                            // file written successfully
                                        }
                                    });
                            } else { console.log(false) }

                        }
                    } else {
                        console.log("_SUBSHARE_")
                        let e = obj[ia][ib].ownershipSheetB.lrUnitShares[ic].subSharesAndEntries.length
                        for (let ie = 0; ie < e; ie++) {
                            if (obj[ia][ib].ownershipSheetB.lrUnitShares[ic].subSharesAndEntries[ie].lrOwners) {
                                console.log(true)
                                let f = obj[ia][ib].ownershipSheetB.lrUnitShares[ic].subSharesAndEntries[ie].lrOwners.length
                                for (let i_f = 0; i_f < f; i_f++) {
                                    console.log(obj[ia][ib].ownershipSheetB.lrUnitShares[ic].subSharesAndEntries[ie].lrOwners[i_f].name)
                                    if (obj[ia][ib].ownershipSheetB.lrUnitShares[ic].subSharesAndEntries[ie].lrOwners[i_f].name) {
                                        console.log(true)
                                        fs.writeFile('test/pulanovo.json',
                                            `,[{"ime": "${obj[ia][ib].ownershipSheetB.lrUnitShares[ic].subSharesAndEntries[ie].lrOwners[i_f].name}", "adresa": "${obj[ia][ib].ownershipSheetB.lrUnitShares[ic].subSharesAndEntries[ie].lrOwners[i_f].adress}", "OIB": "${obj[ia][ib].ownershipSheetB.lrUnitShares[ic].subSharesAndEntries[ie].lrOwners[i_f].taxNumber}", "Zemljišnoknjižni ured": "${obj[ia][ib].institutionName}", "Broj ZK uloška/KPU poduloška": "${obj[ia][ib].lrUnitNumber}"}],`, { encoding: 'utf8', flag: 'a' }, err => {

                                                if (err) {
                                                    console.error(err);
                                                } else {
                                                    // file written successfully
                                                }
                                            });
                                    } else { console.log(false) }
                                }
                            } else {
                                console.log(false)
                                console.log('_ERROR_NO_DATA_')
                            }

                        }

                    }
                }
            }
            await delay(20)
        }
    } makeALoopWait()
    //console.log(obj[99][0].ownershipSheetB.lrUnitShares[0].lrOwners[0].name)
});

