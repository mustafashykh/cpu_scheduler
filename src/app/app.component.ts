import { Component, DoCheck } from '@angular/core';
import { SchedulerService } from '../_services/scheduler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  list: any[] = [];
  result: any[] = [];
  selectedScheduler = 'FCFS';
  avgWaitingTime = 0;
  avgTAT = 0;
  totalExecutionTime = 0;
  error = true;

  err = {
    first: false,
    second: false,
    third: false
  };

  process: { pid: any; bt: any; art: any; remainingBurstTime?: any; burstTime?: any; };
  constructor(private sceduler: SchedulerService) {
    this.process = { pid: '', bt: '', art: '' };
  }

  addProcess() {
    if (this.errorHandeler()) {
      this.process.remainingBurstTime = this.process.burstTime;
      this.list.push(this.process);
      this.process = { pid: '', bt: '', art: '' };
      this.err.first = false;
      this.err.second = false;
      this.err.third = false;
    }
  }


  execute() {
    if (this.list.length !== 0) {
      switch (this.selectedScheduler) {
        case 'FCFS':
          this.sceduler.FCFS(this.list).toPromise()
            .then(res => {
              this.result = res.ganttChart;
              this.avgWaitingTime = res.avgWaitingTime;
              this.avgTAT = res.avgTAT;
              this.totalExecutionTime = res.totalExecutionTime;
            });
          break;
        case 'SJF':
          this.sceduler.SJF(this.list).toPromise()
            .then(res => {
              this.result = res.ganttChart;
              this.avgWaitingTime = res.avgWaitingTime;
              this.avgTAT = res.avgTAT;
              this.totalExecutionTime = res.totalExecutionTime;
            });
          break;
      }
    }
  }

  selectScheduler(value) {
    this.result = [];
    this.selectedScheduler = value;
  }

  errorHandeler() {
    if (this.process.pid === '') {
      this.err.first = true;
    }

    if (this.process.art === '') {
      this.err.third = true;
    }

    if (this.process.bt === '') {
      this.err.second = true;
    }
    if (this.process.pid === '' || this.process.art === '' || this.process.bt === '') {
      return false;
    }
    return true;
  }
}
