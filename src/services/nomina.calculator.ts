import appConfig from "@/app.config.ts";
import {formatMoney} from "@/helper/utils.ts";

export interface INomina {
    salary: number,
    ars: number,
    afp: number,
    tss: number,
    isr: number,
    dependants: number,
    dependencies: number,
    retentions: number,
    salary_per_day: number,
    salary_per_hour: number,
    net_salary: number,
}

export interface INode {
    key: string,
    data: Record<string, any>
    children?: INode[]
}

export default class NominaCalculator {
    protected readonly salary: number;
    protected dep_additional = 0
    public result: INomina = {
        salary: 0,
        ars: 0,
        afp: 0,
        tss: 0,
        isr: 0,
        retentions: 0,
        dependants: 0,
        dependencies: 0,
        salary_per_day: 0,
        salary_per_hour: 0,
        net_salary: 0
    }

    constructor(new_salary: number, dependants = 0) {
        this.salary = new_salary;
        this.dep_additional = dependants;
        this.calculate()
    }

    calculate() {
        this.result.dependants = this.dep_additional
        this.getIsr();
        this.calculateSalary();
        this.result.salary = this.salary
        this.result.net_salary = this.salary - this.result.retentions;
    }

    private getTss() {
        this.result.afp = this.salary * appConfig.afp_rate;
        this.result.ars = this.salary * appConfig.ars_rate;
        this.result.dependencies = this.dep_additional * appConfig.pay_per_additional;
        this.result.tss = (this.salary * appConfig.tss_rate)
    }

    private calculateSalary() {
        this.result.salary_per_day = this.salary / appConfig.laborable_days;
        this.result.salary_per_hour = this.result.salary_per_day / 8
    }

    private getIsr() {
        this.getTss();
        const salary_after_tss = this.salary - this.result.tss;
        let result: number;
        if (salary_after_tss <= appConfig.isr_ranges[0]) {
            result = 0
        } else if (salary_after_tss <= appConfig.isr_ranges[1]) {
            result = (salary_after_tss - appConfig.isr_ranges[0]) * 0.15
        } else if (salary_after_tss <= appConfig.isr_ranges[2]) {
            result = (2601.33) + ((salary_after_tss - appConfig.isr_ranges[1]) * 0.2)
        } else {
            result = (6648) + ((salary_after_tss - appConfig.isr_ranges[2]) * 0.25)
        }
        this.result.isr = result;
        this.result.retentions = this.result.tss + this.result.isr + this.result.dependencies;
    }



    getNodes(): Array<INode> {
        return [
            {
                key: "0",
                data: {
                    name: "Sueldo Bruto",
                    value: formatMoney(this.result.salary)
                },
                children: [
                    {
                        key: "0-0",
                        data: {
                            name: "Salario Diario",
                            value: formatMoney(this.result.salary_per_day)
                        }
                    },
                    {
                        key: "0-1",
                        data: {
                            name: "Salario por Hora",
                            value: formatMoney(this.result.salary_per_hour)
                        }
                    }
                ]
            },
            {
                key: "1",
                data: {
                    name: "Retenciones",
                    value: formatMoney(this.result.retentions),
                },
                children: [
                    {
                        key: "1-0",
                        data: {
                            name: "Retenciones TSS",
                            value: formatMoney(this.result.tss + this.result.dependencies)
                        },
                        children: [
                            {
                                key: "1-0-0",
                                data: {
                                    name: "Seguro de Salud (ARS)",
                                    value: formatMoney(this.result.ars)
                                },
                            },
                            {
                                key: "1-0-1",
                                data: {
                                    name: "Fondo de Pensiones (AFP)",
                                    value: formatMoney(this.result.afp)
                                },
                            },
                            {
                                key: "1-0-2",
                                data: {
                                    name: `Dependientes (${this.result.dependants})`,
                                    value: formatMoney(this.result.dependencies)
                                },
                            }
                        ]
                    },
                    {
                        key: "1-1",
                        data: {
                            name: "Impuesto Sobre la Renta (ISR)",
                            value: formatMoney(this.result.isr)
                        }
                    }
                ]
            },
            {
                key: "1",
                data: {
                    name: "Sueldo Neto",
                    value: formatMoney(this.result.net_salary)
                }
            }

        ]
    }

}