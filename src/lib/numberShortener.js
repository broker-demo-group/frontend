export function numberShortener(bal, dp = 6) {
    let stringBal = Number(bal).toFixed(dp);
    return stringBal;
}