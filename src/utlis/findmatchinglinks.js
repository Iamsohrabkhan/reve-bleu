 function findMatchingLink(previousPage, links) {
    for (let link of links) {
        if (link.href.includes(previousPage)) {
            return link; 
        }
    }
    return null; 
}
export default findMatchingLink