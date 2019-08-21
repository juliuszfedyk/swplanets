import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlanetsService} from '../../services/planets.service';
import {Planet} from '../../models/planet.model';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from '../../services/notifications.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private _planets: Planet[] = [];
  private _filteredPlanets: Planet[] = [];
  public loading = true;

  public set planets(planets: Planet[]) {
    this._planets = planets;
    this.applyFilter();
  }

  public get planets(): Planet[] {
    return this._planets;
  }

  public filterValue = '';

  public set filteredPlanets(planets: Planet[]) {
    this._filteredPlanets = planets;
    this.applyPagination();
  }

  public get filteredPlanets(): Planet[] {
    return this._filteredPlanets;
  }

  // planets displayed within a page;
  public displayedPlanets: Planet[] = [];
  public currentPage = 2;
  public planetsPerPage = 10;
  public planetsPerPageOptions = [5, 10, 25, 100];
  public pagesArray = [];

  constructor(
    private notificationsService: NotificationsService,
    private planetsService: PlanetsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.subscriptions.add(
      this.planetsService.getPlanets$().pipe(
      map((planet: any) => {
        return {
          ...planet,
          diameter: planet.diameter === 'unknown' ? 0 : parseInt(planet.diameter, 10),
          id: planet.url.split('/')[5]
        };
      })
    ).subscribe((planet: Planet) => {
        this.planets.push(planet);
        this.applyFilter();
      },
      this.errHandler.bind(this),
      () => {
        this.loading = false;
      }
    ));
    this.subscriptions.add(
      this.route.queryParams
        .subscribe(this.handleQueryParamsChange.bind(this)));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private handleQueryParamsChange({page, planetsPerPage}) {
    page = parseInt(page, 10);
    planetsPerPage = parseInt(planetsPerPage, 10);
    this.currentPage = page ? page : 1;
    this.planetsPerPage = planetsPerPage ? planetsPerPage : 10;
    this.applyPagination();
  }

  private errHandler(err) {
    console.error(err);
    this.notificationsService.setNotification(
      'There was an error while connecting to the server.'
      + 'Please try refreshing the page.'
    );
  }

  public applyFilter() {
    if (this.filterValue.length === 0) {
      this.filteredPlanets = this.planets;
    } else {
      this.filteredPlanets = this.planets.filter(
        (planet: Planet) => planet.name.search(new RegExp(this.filterValue, 'i')) !== -1
      );
    }
  }

  public applyPagination() {
    const pagesAmount = Math.ceil(this.filteredPlanets.length / this.planetsPerPage);
    if (this.currentPage > pagesAmount || this.currentPage < 0) {
      this.router.navigate([],
        {
          relativeTo: this.route,
          queryParams: {page: '1'},
          queryParamsHandling: 'merge'
        });
    }
    this.pagesArray = new Array(pagesAmount);
    const from = (this.currentPage - 1) * this.planetsPerPage;
    const to = from + this.planetsPerPage;
    this.displayedPlanets = this.filteredPlanets
      .slice(from, to);
  }
}
