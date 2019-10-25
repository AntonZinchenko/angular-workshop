import { Component, Optional, InjectionToken, Inject } from '@angular/core';
import { GeneratorService, GeneratorFactory } from 'src/app/core/services/generator';
import { ConstantsService } from 'src/app/core/services/constant.service';
import { ConfigOptionsService } from 'src/app/core/services/config-options.service';
import { ConfigEnity } from 'src/app/core/models/config';

const AppConstants = new InjectionToken('constantsService');
const SeqLength = new InjectionToken('n');
const SeqResult = new InjectionToken('seqResult');

const SEQUENCE_LENGTH = 10;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [
    ConfigOptionsService,
    GeneratorService,
    { provide: AppConstants, useValue: ConstantsService },
    { provide: SeqLength, useValue: SEQUENCE_LENGTH },
    { provide: SeqResult, useFactory: GeneratorFactory, deps: [GeneratorService, SeqLength] }
  ]
})
export class AboutComponent {
  randomSequence: string[];
  constTitle: string;
  configInstance: ConfigEnity;

  constructor( @Optional() private configOptionsService: ConfigOptionsService,
               @Optional() @Inject(AppConstants) private constantsService: any,
               @Optional() @Inject(SeqResult) private sequence: string[]) {

    this.refreshStorageInfo();

    if (constantsService) {
      this.constTitle = `App: ${constantsService.App}, Ver: ${constantsService.Ver}`;
    }

    this.randomSequence = (sequence) ? sequence : [];
  }

  private refreshStorageInfo() {
    this.configInstance = this.configOptionsService
      ? this.configOptionsService.config : {} as ConfigEnity;
  }

  updateLogin(value: string) {
    if (this.configOptionsService) {
      this.configInstance.login = value;
      this.configOptionsService.config = this.configInstance;
      this.refreshStorageInfo();
    }
  }

  get configString() {
    return JSON.stringify(this.configInstance);
  }
}
