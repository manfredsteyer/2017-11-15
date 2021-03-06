import { Component } from '@angular/core';
import { Flight } from '../../entities/flight';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, ValidatorFn } from '@angular/forms';
import { FlightService } from '../flight-search/flight.service';

@Component({
    selector: 'flight-search-multistop',
    templateUrl: 'flight-search-multistop.component.html',
    providers: [FlightService],
    styleUrls: ['flight-search-multistop.component.css']
})
export class FlightSearchMultistopComponent {

    public selectedFlight: Flight;

    public filter: FormGroup;
    public validators: Array<ValidatorFn> = [];

    constructor(private flightService: FlightService,
                private fb: FormBuilder) {

        this.validators = [
            Validators.required,
            Validators.minLength(3)
        ];

        this.filter = fb.group({
            'from': ['Graz', this.validators],
            'to': ['Hamburg', this.validators],
            'stopovers': fb.array([])
        });
    }

    public get flights(): Array<Flight> {
        return this.flightService.flights;
    }

    public addStopover(): void {
        const stopovers = this.filter.controls['stopovers'] as FormArray;
        stopovers.push(this.fb.group({
            'city': ['', this.validators],
            'duration': ['1']
        }));
    }

    public removeStopover(): void {
        const stopovers = this.filter.controls['stopovers'] as FormArray;
        stopovers.removeAt(stopovers.length - 1);
    }

    public select(f: Flight): void {
        this.selectedFlight = f;
    }

    public search(): void {

        const value = this.filter.value;
        console.info('value', value);

        this.flightService
            .load(value.from, value.to);
    }
}
