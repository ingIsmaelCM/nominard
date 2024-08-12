export  default {
    afp_rate: Number(import.meta.env.VITE_AFP_RATE),
    ars_rate: Number(import.meta.env.VITE_ARS_RATE),
    tss_rate: Number(import.meta.env.VITE_TSS_RATE),
    isr_ranges:  [34685, 52027.42, 72260.25, Infinity],
    laborable_days: Number(import.meta.env.VITE_LABORABLE_DAY),
    pay_per_additional: Number(import.meta.env.VITE_PAY_PER_ADDITIONAL)
}