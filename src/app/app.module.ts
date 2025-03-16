import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ScrollupComponent } from './components/scrollup/scrollup.component';
import { AboutComponent } from './components/about/about.component';
import { FeaturesComponent } from './components/features/features.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/detailed-services/detailed-services.component';
import { CtaComponent } from './components/cta/cta.component';
import { StatsComponent } from './components/stats/stats.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { provideRouter, RouterLink, RouterModule } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PreloaderComponent,
    ScrollupComponent,
    SignupComponent,
    UserInfoComponent,
    LoginComponent,
    HomeComponent,
    HeroComponent,
    AboutComponent,
    FeaturesComponent,
    ServicesComponent,
    CtaComponent,
    StatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
