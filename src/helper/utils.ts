export const formatMoney=(value: any) =>{
    value = parseFloat(value);
    if (isNaN(value)) {
        return "$" + "0";
    }
    return "$" + value.toLocaleString("en-US", {minimumFractionDigits: 2});
}