import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '../src/App'

const mockMasterRecord = {
  projects: [
    { id: 'a', name: 'Project A', path: 'a/a.json', image: 'img/a.png', accent_rgb: [255, 0, 0] },
    { id: 'b', name: 'Project B', path: 'b/b.json', image: 'img/b.png', accent_rgb: [0, 255, 0] },
  ],
}

const mockProjectA = {
  entries: [
    { title: 'A Entry 1', description: 'Desc A1', date: 20260101, image: 'img/a1.png' },
    { title: 'A Entry 2', description: 'Desc A2', date: 20260201, image: 'img/a2.png' },
  ],
}

const mockProjectB = {
  entries: [
    { title: 'B Entry 1', description: 'Desc B1', date: 20260301, image: 'img/b1.png' },
  ],
}

function mockFetch(dataMap) {
  return vi.fn((url) => {
    const key = url.replace(/^\/projectrecord\//, '/').replace(/^\//, '')
    const data = dataMap[key]
    if (data) {
      return Promise.resolve({ ok: true, url, json: () => Promise.resolve(data), text: () => Promise.resolve(JSON.stringify(data)) })
    }
    return Promise.resolve({ ok: false, url, status: 404 })
  })
}

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders navbar with Home and Contact', async () => {
    global.fetch = mockFetch({
      'projects/masterRecord.JSON': mockMasterRecord,
      'projects/a/a.json': mockProjectA,
      'projects/b/b.json': mockProjectB,
    })

    render(<App />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders project names from master record', async () => {
    global.fetch = mockFetch({
      'projects/masterRecord.JSON': mockMasterRecord,
      'projects/a/a.json': mockProjectA,
      'projects/b/b.json': mockProjectB,
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Project A')).toBeInTheDocument()
      expect(screen.getByText('Project B')).toBeInTheDocument()
    })
  })

  it('renders all entries when no project is selected', async () => {
    global.fetch = mockFetch({
      'projects/masterRecord.JSON': mockMasterRecord,
      'projects/a/a.json': mockProjectA,
      'projects/b/b.json': mockProjectB,
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('B Entry 1')).toBeInTheDocument()
      expect(screen.getByText('A Entry 2')).toBeInTheDocument()
      expect(screen.getByText('A Entry 1')).toBeInTheDocument()
    })
  })

  it('filters entries when a project is clicked', async () => {
    const user = userEvent.setup()
    global.fetch = mockFetch({
      'projects/masterRecord.JSON': mockMasterRecord,
      'projects/a/a.json': mockProjectA,
      'projects/b/b.json': mockProjectB,
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Project A')).toBeInTheDocument()
    })

    await user.click(screen.getByText('Project A'))

    await waitFor(() => {
      expect(screen.getByText('A Entry 1')).toBeInTheDocument()
      expect(screen.getByText('A Entry 2')).toBeInTheDocument()
      expect(screen.queryByText('B Entry 1')).not.toBeInTheDocument()
    })
  })

  it('deselects project when clicked again', async () => {
    const user = userEvent.setup()
    global.fetch = mockFetch({
      'projects/masterRecord.JSON': mockMasterRecord,
      'projects/a/a.json': mockProjectA,
      'projects/b/b.json': mockProjectB,
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Project A')).toBeInTheDocument()
    })

    await user.click(screen.getByText('Project A'))
    await user.click(screen.getByText('Project A'))

    await waitFor(() => {
      expect(screen.getByText('B Entry 1')).toBeInTheDocument()
    })
  })

  it('handles fetch errors gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    render(<App />)

    await waitFor(() => {
      expect(screen.queryByText('A Entry 1')).not.toBeInTheDocument()
    })
  })
})
