import { Component, h, State } from "@stencil/core"

type Example = {
  name?: string,
  path?: string
}

@Component({
  tag: 'x-showcase',
  styleUrl: './showcase.scss'
})
export class Showcase {
  @State() private examples: Example[] = []
  @State() private currentExample: Example = {}

  componentWillLoad() {
    this.examples = [
      {
        path: '/assets/merry-christmas.json',
        name: 'Merry Christmas'
      },
      {
        path: '/assets/happy-holidays.json',
        name: 'Happy Holidays'
      },
      {
        path: '/assets/santa-claus.json',
        name: 'Santa Claus'
      },
      {
        path: '/assets/success-check.json',
        name: 'Success check'
      },
      {
        path: '/assets/snowman.json',
        name: 'Hello Snowman'
      },
      {
        path: '/assets/dinno.json',
        name: 'Hello Dinno'
      },
      {
        path: '/assets/astronaut.json',
        name: 'Astrounaut'
      },
      {
        path: '/assets/medal.json',
        name: 'Gold medal'
      },
      {
        path: '/assets/fingerprint.json',
        name: 'Fingerprint'
      },
      {
        path: '/assets/spinner.json',
        name: 'Spinner'
      },
      {
        path: '/assets/gift.json',
        name: 'Gift'
      },
      {
        path: '/assets/new-year.json',
        name: 'New Year'
      },
      {
        path: '/assets/laughing-crab.json',
        name: 'Laughing Crab'
      }
    ]
    this.currentExample = this.examples[0]
  }

  changeAnimation = (e: Event) => {
    const { value } = e.target as HTMLSelectElement
    const animation = this.examples.find(e => e.path === value)
    this.currentExample = animation
  }

  render() {
    return (
      <div class="showcase">
        {/* <aside class="showcase__sidebar">
          <header class="showcase__sidebar__header">
            <h4>Gallery examples</h4>
          </header>
          <article class="showcase__sidebar__content">
            {
              this.examples.map(example => (
                <a
                  data-example-path={example.path}
                  data-active={example.name === this.currentExample.name}
                  onClick={() => this.changeAnimation(example)}
                >
                  {example.name}
                </a>
              ))
            }
          </article>
        </aside> */}
        <header class="showcase__control">
          {/* <h4>Gallery examples</h4> */}
          <select onChange={this.changeAnimation}>
            {
              this.examples.map(example => (
                <option value={example.path}>
                  {example.name}
                </option>
              ))
            }
          </select>
        </header>
        <article class="showcase__content">
          <x-lottie aspectRatio="xMidYMid meet" data={this.currentExample.path} />
        </article>
      </div>
    )
  }
}
