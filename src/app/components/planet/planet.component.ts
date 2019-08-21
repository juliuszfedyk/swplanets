import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Planet} from '../../models/planet.model';
import {PlanetsService} from '../../services/planets.service';
import {NotificationsService} from '../../services/notifications.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public planet: Planet;

  constructor(
    private location: Location,
    private notificationsService: NotificationsService,
    private planetsService: PlanetsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.subscription = this.planetsService.getplanet$(id).subscribe(
      (planet: Planet) => {
        this.planet = planet;
      },
      this.handleError.bind(this)
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onBack() {
    this.location.back();
  }

  private handleError(err) {
    console.error(err);
    this.notificationsService.setNotification(
      'There was an error while retrieving your planet.'
      + 'Please try refreshing the page'
    );
  }
}
