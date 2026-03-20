import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { PageSize } from "../../config/config";

@Component({
    selector: 'app-pagination',
    imports: [],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})

export class PaginationComponent implements OnInit, OnChanges {

    @Input() userCount!: number;
    @Output() selectedPage: EventEmitter<number> = new EventEmitter();
    @Output() previousPage = new EventEmitter();
    @Output() nextPage = new EventEmitter();

    pages!: number[];
    activePage: number = 1;
    firstPageActive: boolean = true;
    lastPageActive: boolean = false;
    pageSize = PageSize;

    constructor() {}

    ngOnInit(): void {
        this.getPageCount(this.userCount);
    }

    ngOnChanges(changes: SimpleChanges) {
		if (changes['userCount'] && changes['userCount'].previousValue != changes['userCount'].currentValue) {
			this.getPageCount(this.userCount);
		}
	}

    getPageCount(userCount: number): number[] {
        let pages = Math.ceil(userCount / this.pageSize);
        let pagesArray = [];
        for (let i=0; i < pages; i++) {
            pagesArray.push(i + 1)
        }
        return this.pages = pagesArray;
    }

    goToSelectedPage(pageIndex: number) {
        this.selectedPage.emit(pageIndex + 1);
        this.activePage = pageIndex + 1;
        this.lastPageActive = pageIndex === this.pages.length - 1 ? true : false;
        this.firstPageActive = pageIndex === this.pages.indexOf(this.pages[0]) ? true : false;
    }

    goToPreviousPage() {
        this.previousPage.emit();
        this.goToSelectedPage(this.activePage - 2);
    }
    
    goToNextPage() {
        this.nextPage.emit();
        this.goToSelectedPage(this.activePage);
    }
}