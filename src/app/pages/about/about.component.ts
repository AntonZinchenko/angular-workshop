import { Component, Optional, InjectionToken, Inject } from '@angular/core';
import { GeneratorService } from 'src/app/core/services/generator';
import { ConstantsService } from 'src/app/core/services/constant.service';
import { ConfigOptionsService } from 'src/app/core/services/config-options.service';
import { ConfigEnity } from 'src/app/core/models/config';

const CONSTANTS_TOKEN = new InjectionToken('constantsService');

const SEQUENCE_LENGTH = 10;
const SeqLength = new InjectionToken('n');
export const GeneratorFactory = (n: number) => new GeneratorService(n);

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [
    ConfigOptionsService,
    { provide: CONSTANTS_TOKEN, useValue: ConstantsService },
    { provide: SeqLength, useValue: SEQUENCE_LENGTH },
    { provide: GeneratorService, useFactory: GeneratorFactory, deps: [SeqLength] }
  ]
})
export class AboutComponent {
  lengthFromService: number;
  randomSequence: string[];

  constTitle: string;
  configInstance: ConfigEnity;

  constructor( @Optional() private configOptionsService: ConfigOptionsService,
               @Optional() @Inject(CONSTANTS_TOKEN) private constantsService: any,
               @Optional() private seqService: GeneratorService) {

    this.refreshStorageInfo();

    if (constantsService) {
      this.constTitle = `App: ${constantsService.App}, Ver: ${constantsService.Ver}`;
    }

    if (seqService) {
      this.lengthFromService = seqService.length;
      this.randomSequence = seqService.randomSequence();
    }
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
