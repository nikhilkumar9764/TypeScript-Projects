import { Component, OnInit } from "@angular/core";
import { AsyncSubject, BehaviorSubject, from, interval, merge, Observable, of, range, Subject } from "rxjs";
import { map, take } from "rxjs/operators";

@Component({
    selector : 'rxjs-demo',
    template : `<span>Rxjs Demo session</span>`
})


export class RxjsDemo implements OnInit{
     obs: any;
     ngOnInit(): void {
        // const myobs = new Observable((subs)=>{
        //     subs.next(1);
        //     subs.next(2);
        //     subs.next(3);
        //     setTimeout(()=> {
        //         subs.next(4);
        //         subs.complete();
        //     })
        // });
        
        // console.log("just before subscribe");
        
        // myobs.subscribe({
        //     next(x) {
        //         console.log('got element'+x);
        //     },
        //     error(err) {
        //         console.log('some error'+err);
        //     },
        //     complete()
        //     {
        //         console.log('done');
        //     }
        // });

        // console.log("just after subscribe");
        // var obs = new Subject();
        // obs.subscribe((x)=> console.log("First subscriber called",x));
        // obs.next(1);
        // obs.next(2);
        // obs.next(3);

        // obs.subscribe((y)=> console.log("Second subscriber called",y));
        // obs.next(4);
        // obs.next(5);

        // var obs = new BehaviorSubject(0);
        // obs.subscribe((x)=> console.log("First subscriber called",x));
        // obs.next(1);
        // obs.next(2);
        // obs.next(3);

        // obs.subscribe((y)=> console.log("Second subscriber called",y));
        // obs.next(4);
        // obs.next(5);

        // var obs = new AsyncSubject();
        // obs.subscribe((x)=> console.log("First subscriber called",x));
        // obs.next(1);
        // obs.next(2);
        // obs.next(3);

        // obs.subscribe((y)=> console.log("Second subscriber called",y));
        // obs.next(4);
        // obs.next(5);
        // obs.complete();

        // const op1 = of(10,20,30).pipe(map((x) => x*x)).subscribe((vv)=>console.log(vv));
        // console.log(op1);

        // const op2 = of({"Hughes" : "Jackman"} , [3,4,5], function greet() {
        //     return 'hEllo world';
        // })

        // const op3 = from([3,5,7,8]); // from converts an array/promise into a Observable

        // op3.subscribe((val)=>console.log(val));

        // op2.subscribe((x) => console.log(x));

        // const s1 = interval(1000).pipe(take(5));
        
        // const s2 = from(range(100,10)).pipe(map((v) => v*2)).subscribe((val)=>console.log(val));
        // const s2 = interval(2000).pipe(take(6));
        // const s3 = interval(2000).pipe(take(5)); 
        // const no_concurrent =2;
        // const ob1 = merge(s1,s2,s3,no_concurrent);
        // ob1.subscribe((val) => console.log(val));

        // const numbers = [2,3,4,5];
        // const arr = ['a','b','c','d','e'];
        //  merge(numbers,arr).subscribe((v) => console.log(v));
     }

     ngOnDestroy() : void {
         console.log("Subscriber destroyed");
         this.obs.unsubscribe();
     }
}


