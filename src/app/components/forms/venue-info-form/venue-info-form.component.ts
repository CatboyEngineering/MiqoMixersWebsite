import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VenueChangeRequest } from '../../../models/API/request/venue-change-request.interface';
import { FormName } from '../../../models/enum/form-name.enum';
import { VenueInfoForm } from '../../../models/form/venue-info-form.interface';
import { Venue } from '../../../models/venue.interface';
import { TimePipe } from '../../../pipes/time-pipe/time.pipe';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { ChipComponent } from '../../ui/chip/chip.component';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { UiFormFieldErrorComponent } from '../../ui/ui-form-field-error/ui-form-field-error.component';
import { HoursFormComponent } from '../hours-form/hours-form.component';

@Component({
  selector: 'app-venue-info-form.',
  standalone: true,
  imports: [ReactiveFormsModule, UiFormFieldErrorComponent, UiFormErrorComponent, CommonModule, ChipComponent, HoursFormComponent, TimePipe],
  templateUrl: './venue-info-form..component.html',
  styleUrl: './venue-info-form.component.css'
})
export class VenueInfoFormComponent implements OnInit {
  @Input() venue?: Venue;

  venueInfoForm: FormGroup<VenueInfoForm>;
  FormName = FormName;

  constructor(private formBuilder: FormBuilder, private venueStateService: VenueStateService) {
    this.venueInfoForm = this.formBuilder.group<VenueInfoForm>({
      venueName: this.formBuilder.nonNullable.control('', {
        validators: Validators.compose([Validators.required, Validators.maxLength(60)])
      }),
      about: this.formBuilder.nonNullable.control('', {
        validators: Validators.compose([Validators.required, Validators.maxLength(300)])
      }),
      datacenter: this.formBuilder.nonNullable.control('Aether', {
        validators: Validators.compose([Validators.required])
      }),
      world: this.formBuilder.nonNullable.control('Adamantoise', {
        validators: Validators.compose([Validators.required])
      }),
      district: this.formBuilder.nonNullable.control('Empyreum', {
        validators: Validators.compose([Validators.required])
      }),
      ward: this.formBuilder.nonNullable.control(1, {
        validators: Validators.compose([Validators.required])
      }),
      plot: this.formBuilder.nonNullable.control(1, {
        validators: Validators.compose([Validators.required])
      }),
      hours: this.formBuilder.nonNullable.control([], {
        validators: Validators.compose([Validators.required])
      }),
      website: this.formBuilder.nonNullable.control(''),
      tags: this.formBuilder.nonNullable.control('', {
        validators: Validators.compose([Validators.required])
      })
    });
  }

  ngOnInit(): void {
    if (!!this.venue) {
      this.venueInfoForm.controls.venueName.patchValue(this.venue.venue.venueName);
      this.venueInfoForm.controls.about.patchValue(this.venue.venue.about);
      this.venueInfoForm.controls.datacenter.patchValue(this.venue.venue.datacenter);
      this.venueInfoForm.controls.world.patchValue(this.venue.venue.world);
      this.venueInfoForm.controls.district.patchValue(this.venue.venue.district);
      this.venueInfoForm.controls.ward.patchValue(this.venue.venue.ward);
      this.venueInfoForm.controls.plot.patchValue(this.venue.venue.plot);
      this.venueInfoForm.controls.hours.patchValue(this.venue.venue.hours);
      this.venueInfoForm.controls.website.patchValue(this.venue.venue.website);
      this.venueInfoForm.controls.tags.patchValue(this.venue.venue.tags.toString());
    }
  }

  onHoursAdded(hours: any) {
    var existingHours = structuredClone(this.venueInfoForm.controls.hours.value);

    existingHours.push(hours);

    this.venueInfoForm.controls.hours.patchValue(existingHours);
  }

  onHoursRemoved(hour: any) {
    // TODO this does not work, removes the wrong element
    var existingHours = structuredClone(this.venueInfoForm.controls.hours.value);

    existingHours.splice(existingHours.indexOf(hour), 1);

    this.venueInfoForm.controls.hours.patchValue(existingHours);
  }

  submit() {
    if (this.venueInfoForm.valid) {
      var newVenue: VenueChangeRequest = {
        venueName: this.venueInfoForm.controls.venueName.value,
        about: this.venueInfoForm.controls.about.value,
        datacenter: this.venueInfoForm.controls.datacenter.value,
        world: this.venueInfoForm.controls.world.value,
        district: this.venueInfoForm.controls.district.value,
        ward: this.venueInfoForm.controls.ward.value,
        plot: this.venueInfoForm.controls.plot.value,
        hours: this.venueInfoForm.controls.hours.value,
        website: this.venueInfoForm.controls.website.value,
        tags: this.splitTags()
      };

      if (!!this.venue) {
        this.venueStateService.onUpdateVenue(newVenue, this.venue.venue.venueID);
      } else {
        this.venueStateService.onAddVenue(newVenue);
      }
    }
  }

  splitTags(): string[] {
    var splits = this.venueInfoForm.controls.tags.value
      .split(/,/)
      .map(tag => tag.trim())
      .filter(tag => tag != '');

    return splits;
  }
}
